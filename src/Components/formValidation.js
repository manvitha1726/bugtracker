import Joi from 'joi-browser';

// Define your validation schema using Joi
const schema = Joi.object({
    moduleName: Joi.string().min(3).required().label('Module Name'),
    description: Joi.string().required().min(10).max(300).label('Description'),
    shortDescription: Joi.string().min(6).required().label('shortDescription'),
    identfiedemp: Joi.string().required().label("Identified Employee").error(() => {
      return {
        message: 'Select a valid employee.'
      }
    })
  });

  const schema1 = Joi.object({
    moduleName: Joi.string().min(6).required().label('Module Name'),
    description: Joi.string().required().min(10).max(300).label('Description'),
    shortDescription: Joi.string().min(6).required().label('shortDescription'),
  });

  // Validation function
const validateForm = (data) => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return null;
    console.log("data in validation form",data);
  
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
  
    return errors;
  };

  export const validateForm1 = (data) => {
    const options = { abortEarly: false };
    const { error } = schema1.validate(data, options);
    if (!error) return null;
    console.log("data in validation form",data);
  
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
  
    return errors;
  };

  export default validateForm;