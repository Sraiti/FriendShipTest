import mongoose, {
  FilterQuery,
  Model,
  UpdateQuery,
  AggregateOptions,
  PipelineStage,
  QueryOptions,
} from "mongoose";

export class ModelFunction<T> {
  constructor(public model: Model<T>) {}

  addBulk = (arrayOfDocument: Array<T>) => {
    return this.model.insertMany(arrayOfDocument);
  };

  bulkWrite = (
    array: Array<T>,
    filter: string,
    filteringField?: string,
    extraFilters?: any
  ) => {
    const extractValue = (obj: any, path: string) => {
      const pathList = path
        .replace(/\[|\]\.?/g, ".")
        .split(".")
        .filter((s) => s);
      return pathList.reduce((acc, val) => acc && acc[val], obj);
    };

    const operations = array.map((item: any) => {
      let filterValue = item[filter];
      if (filter.includes(".")) {
        filterValue = extractValue(item, filter);
      }
      const updateFilter = {
        [filteringField || filter]: filterValue,
        ...extraFilters,
      };

      return {
        updateOne: {
          filter: updateFilter,
          update: { $set: { ...item } },
          upsert: true,
        },
      };
    });

    return this.model.bulkWrite(operations);
  };

  save = (objetToCreate: UpdateQuery<T>) => {
    return this.model.create(objetToCreate);
  };

  search = (
    objetToFind: FilterQuery<T>,
    single?: boolean,
    options?: QueryOptions
  ) => {
    if (single) {
      // Return a promise that resolves to the found document or null
      return this.model
        .findOne(objetToFind, options)
        .exec()
        .then((document) => {
          if (document) {
            ///Return as T so i can have intellisense on the other side YAY
            return document as T;
          }
          ///Return Null if nothing

          return null;
        });
    }
    // Return a promise that resolves to the found documents the same as above fancier
    return this.model.find(objetToFind, options).exec() as Promise<T>;
  };

  searchById = (id: mongoose.Types.ObjectId, options?: QueryOptions) => {
    // Return a promise that resolves to the found document or null
    return this.model
      .findById(id, options)
      .exec()
      .then((document) => {
        if (document) {
          ///Return as T so i can have intellisense on the other side YAY
          return document as T;
        }
        ///Return Null if nothing

        return null;
      });

    // Return a promise that resolves to the found documents the same as above fancier
  };
  aggregate = (pipelines: Array<PipelineStage>, options?: AggregateOptions) => {
    this.model.aggregate(pipelines, options as any);
  };
  explain = (pipelines: Array<PipelineStage>, options?: AggregateOptions) => {
    this.model.aggregate(pipelines, options as any).explain();
  };
  update = (
    filters: FilterQuery<T>,
    objetToCreate: UpdateQuery<T>,
    single: boolean
  ) => {
    if (single) {
      return this.model.updateOne(filters, objetToCreate, {
        upsert: true,
      });
    } else {
      return this.model.updateMany(filters, objetToCreate, {
        upsert: true,
      });
    }
  };
  delete = (filters: FilterQuery<T>, single: boolean) => {
    if (single) {
      return this.model.deleteOne(filters);
    } else {
      return this.model.deleteMany(filters);
    }
  };
}
