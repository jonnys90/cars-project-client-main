import Joi from "joi";

const carQuantitySchema = Joi.object({
  carQuantity: Joi.number().min(0).required().messages({
    "number.base": "כמות הרכבים חייבת להיות מספר שלם",
    "number.empty": "כמות הרכבים חייבת להיות מספר שלם",
    "number.min": "כמות הרכבים חייבת להיות לפחות 1",
  }),
});

const validateCarQuantity = (data: any) => {
  const { error } = carQuantitySchema.validate(data);
  if (error) {
    return error.details[0].message;
  }
  return null;
};

export default validateCarQuantity;
