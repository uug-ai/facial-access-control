import React, { useEffect, useRef, useState } from "react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Text, Input, Button, Logo } from "../../../components/ui";
import { schema } from "./FormSchema";
import { onSubmitAction } from "./FormSubmit";
import { FormData } from "./Types";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import * as CryptoJS from "crypto-js"; // AES encryption, symmetric

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
  Expiration: number; // Unix timestamp, typically represented as a number
  Creation: number; // Unix timestamp, typically represented as a number
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
  console.log("token: ", token);

  const [userData, setUserData] = useState<UserFingerprint | null>(null);
  console.log("KEYYYYY", process.env.NEXT_PUBLIC_PRIVATE_KEY);
  useEffect(() => {
    if (token) {
      try {
        const base64Token = decodeURI(token);
        const encryptedToken = atob(base64Token);
        const bytes = CryptoJS.AES.decrypt(
          encryptedToken,
          process.env.NEXT_PUBLIC_PRIVATE_KEY || ""
        );
        const decryptedToken = bytes.toString(CryptoJS.enc.Base64);

        const base64 = atob(decryptedToken);
        console.log("DECRYPTEDTOKEN: ", base64);

        // Parse the decrypted JSON data
        const parsedData = JSON.parse(base64) as UserFingerprint;

        setUserData(parsedData);
      } catch (error) {
        console.error("Failed to decrypt or parse token", error);
      }
    }
  }, [token]);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: userData?.FirstName || "",
      lastName: userData?.LastName || "",
      email: userData?.Email || "",
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
    </Box>
  );
};

export default FormComponent;
