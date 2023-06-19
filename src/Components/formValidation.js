import Joi from 'joi-browser';

// Define your validation schema using Joi
const schema = Joi.object({
    issueName: Joi.string().required().label('Name'),
    moduleName: Joi.string().min(6).required().label('Module Name'),
    summary: Joi.string().required().min(30).max(300).label('Summary'),
    identfiedemp : Joi.string().required().label('Identfied Demp'),
    dateidentified: Joi.date().iso().required().label('Date Identified'),
    targetdate: Joi.date().iso().min(Joi.ref('dateidentified')).required().label('Target Date'),
    progressreport: Joi.string().required().label('Progress Report'),
    stepsToReproduce: Joi.string().required().label('Steps To Reproduce'),
    description: Joi.string().required().min(30).max(300).label('Description'),
    iterationNumber: Joi.number().integer().positive().required().label('Iteration Number')

  });

  // Validation function
const validateForm = (data) => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return null;
  
    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
  
    return errors;
  };

  export default validateForm;