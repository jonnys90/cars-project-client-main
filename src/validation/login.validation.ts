import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string().min(2).max(50).required().messages({
    "string.base": "שם המשתמש חייב להיות מחרוזת",
    "string.empty": "שם המשתמש חייב להיות מחרוזת",
    "string.min": "שם המשתמש חייב להיות בין 2 ל 50 תווים",
    "string.max": "שם המשתמש חייב להיות בין 2 ל 50 תווים",
  }),
});

const validateLogin = (data: any) => {
  const { error } = loginSchema.validate(data);
  if (error) {
    return error.details[0].message;
  }
  return null;
};

export default validateLogin;
