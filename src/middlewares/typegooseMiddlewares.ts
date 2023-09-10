import { getClass } from "@typegoose/typegoose";
import { NextFunction, Request } from "express";
import { Model, Document } from "mongoose";

export const TypegooseMiddleware = async (_: any, next: any) => {
  const result: any = await next();

  if (Array.isArray(result)) {
    return result.map((item) =>
      item instanceof Model ? convertDocument(item) : item
    );
  }

  if (result instanceof Model) {
    return convertDocument(result);
  }

  return result;
};

function convertDocument(doc: Document) {
  const convertedDocument = doc.toObject();
  const DocumentClass = getClass(doc)!;
  Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
  return convertedDocument;
}
