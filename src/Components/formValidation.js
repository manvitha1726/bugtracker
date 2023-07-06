import Joi from 'joi-browser';

// Define your validation schema using Joi
const schema = Joi.object({
    moduleName: Joi.string().min(6).required().label('Module Name'),
    description: Joi.string().required().min(10).max(300).label('Description'),
    shortDescription: Joi.string().min(6).required().label('shortDescription'),
    stepsToReproduce: Joi.string().required().min(10).max(300).label('stepsToReproduce'),
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

  export default validateForm;