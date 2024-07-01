import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Text, Input, Button, Logo } from "../../../components/ui";
import { schema } from "./FormSchema";
import { onSubmitAction } from "./FormSubmit";
import { FormData } from "./Types";
import { useSearchParams } from "next/navigation";
import { decrypt } from "@/utils/crypto";

interface FormFieldProps {
  name: keyof FormData;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
}

interface UserFingerprint {
  Email: string;
  FirstName: string;
  LastName: string;
  Id: number;
  Expiration: number;
  Creation: number;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  description,
  placeholder,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();
  return (
    <Box className="mb-4">
      <Text as="label" weight="semibold" className="mb-1">
        {label}
      </Text>
      <Input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="bg-white"
      />
      {errors[name] && <p>{(errors[name]?.message as string) || ""}</p>}
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </Box>
  );
};

const FormComponent: React.FC<{
  videoFile: Blob | null;
  onSubmit: SubmitHandler<FormData>;
}> = ({ videoFile, onSubmit }) => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [userData, setUserData] = useState<UserFingerprint | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      dateOfBirth: "",
      video: undefined,
    }, 
  });

  useEffect(() => {
    if (token) {
      const secretKey = process.env.NEXT_PUBLIC_PRIVATE_KEY as string;
      const decodedToken = atob(token as string); // Base64 decode
      const decryptedData = decrypt(decodedToken, secretKey);
      try {
        const user = JSON.parse(decryptedData);
        setUserData(user);
        methods.setValue('firstName', user.firstname);
        methods.setValue('lastName', user.lastname);
        methods.setValue('email', user.email);

        console.log("Form values set", methods.getValues());
      } catch (error) {
        console.error("Failed to decrypt or parse token", error);
      }
    }
  }, [token, methods]);

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


  console.log("User data:", userData)
  
  return (
    <Box>
      <Logo />
      {userData && (
      <FormProvider {...methods}>
        <form
          ref={formRef}
          className="space-y-8"
          onSubmit={(evt) => {
            evt.preventDefault();
            methods.handleSubmit(handleFormSubmit)(evt);
          }}
        >
          <FormField
            name="firstName"
            label="First Name"
            placeholder="First Name"
            description="Your first name."
          />
          <FormField
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
            description="Your last name."
          />
          <FormField
            name="email"
            label="Email"
            placeholder="E-Mail"
            description="Your email address."
          />
          <FormField
            name="phoneNumber"
            label="Phone Number"
            placeholder="Phone Number"
            description="Your phone number."
          />
          <FormField
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            placeholder="Date of Birth"
            description="Your date of birth."
          />
          <Button type="submit" variant="solid" width="third">
            Register
          </Button>
        </form>
      </FormProvider>
    )}
    </Box>
  );
};

export default FormComponent;
