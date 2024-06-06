import React, { useEffect, useRef } from "react";
import { useForm, SubmitHandler, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Text, Input, Button, Logo } from "@uug-ai/ui";
import { schema } from "./formSchema";
import { onSubmitAction } from "./formSubmit";
import { FormData } from "./types";

interface FormFieldProps {
  name: keyof FormData;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, description, placeholder, type = "text" }) => {
  const { register, formState: { errors } } = useFormContext<FormData>();
  return (
    <Box className="mb-4">
      <Text as="label" weight="semibold" className="mb-1">
        {label}
      </Text>
      <Input {...register(name)} type={type} placeholder={placeholder} className="bg-white" />
      {errors[name] && <p>{(errors[name]?.message as string) || ''}</p>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </Box>
  );
};

const FormComponent: React.FC<{ videoFile: Blob | null; onSubmit: SubmitHandler<FormData> }> = ({ videoFile, onSubmit }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      video: undefined,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (videoFile) {
      methods.setValue("video", videoFile);
    }
  }, [videoFile, methods]);

  const handleFormSubmit = (data: FormData) => {
    console.log("handleFormSubmit called with data:", data);
    if (videoFile) {
      onSubmit({ ...data, video: videoFile });
    } else {
      console.error("Video file is required.");
    }
  };

  return (
    <Box>
      <Logo />
      <FormProvider {...methods}>
        <form
          ref={formRef}
          className="space-y-8"
          onSubmit={(evt) => {
            evt.preventDefault();
            methods.handleSubmit(handleFormSubmit)(evt);
          }}
        >
          <FormField name="firstName" label="First Name" placeholder="First Name" description="Your first name." />
          <FormField name="lastName" label="Last Name" placeholder="Last Name" description="Your last name." />
          <FormField name="email" label="Email" placeholder="E-Mail" description="Your email address." />
          <FormField name="phoneNumber" label="Phone Number" placeholder="Phone Number" description="Your phone number." />
          <FormField name="dateOfBirth" label="Date of Birth" type="date" placeholder="Date of Birth" description="Your date of birth." />
          <Button type="submit" variant="solid" width="third">
            Register
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
};

export default FormComponent;
