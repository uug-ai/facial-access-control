'use client';

import React, { useState, useCallback } from "react";
import {
  Box,
  Row,
  Stack,
  Gradient,
  Text,
  Button,
  Socials,
  Icon,
  VideoCapture,
  Input,
  Logo,
} from "../../components/ui";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useOnboardUserMutation } from "@/lib/services/users/userApi";
import { useSearchParams } from "next/navigation";
import { decrypt } from "@/utils/crypto";
import { InfoSection } from "./components/InfoSection";

const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
  dateOfBirth: z.string().refine((val: string) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  id: z.number().int().positive("Invalid ID"),
  video: z.instanceof(Blob, { message: "Video is required" }),
});

type FormData = z.infer<typeof schema>;

const Onboarding: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoFile, setVideoFile] = useState<Blob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [onboardUser] = useOnboardUserMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      id: 0,
      video: undefined,
    },
  });

  const handleRecordingComplete = useCallback((recordedChunks: Blob[]) => {
    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    setVideoFile(videoBlob);
    methods.setValue("video", videoBlob);
    console.log("Final video blob:", videoBlob);
  }, [methods]);

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted with data:", data);
    if (data.video) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'video') {
          formData.append(key, value as Blob, 'video.webm');
        } else {
          formData.append(key, value.toString());
        }
      });
  
      try {
        await onboardUser(data).unwrap();
        setIsSubmitted(true);
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    } else {
      console.error("Video is required in onSubmit");
    }
  };
  

  React.useEffect(() => {
    if (token) {
      const decodedToken = atob(token);
      decrypt(decodedToken)
        .then(decryptedData => {
          try {
            const user = JSON.parse(decryptedData);
            methods.setValue('firstName', user.firstname);
            methods.setValue('lastName', user.lastname);
            methods.setValue('email', user.email);
            methods.setValue('id', user.id);
            console.log("Decrypted token:", user);
          } catch (error) {
            console.error("Failed to parse decrypted token", error);
          }
        })
        .catch(error => {
          console.error("Failed to decrypt token", error);
        });
    }
  }, [token, methods]);

  return (
    <Box className="bg-primary-50">
      <Stack>
        <Gradient />
        <Row className="w-full pt-14 px-20 items-center">
          <Stack className="w-1/3 flex">
            {isSubmitted ? (
              <Text>User registered!</Text>
            ) : (
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                  <Logo />
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
            )}
          </Stack>
          <FaceScanSection
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            handleRecordingComplete={handleRecordingComplete}
          />
        </Row>
        <InfoSection />
      </Stack>
    </Box>
  );
};

interface FormFieldProps {
  name: keyof FormData;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  description,
  placeholder,
  type = "text",
}) => {
  const { register, formState: { errors } } = useFormContext<FormData>();
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

interface FaceScanSectionProps {
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  handleRecordingComplete: (recordedChunks: Blob[]) => void;
}

const FaceScanSection: React.FC<FaceScanSectionProps> = ({
  isRecording,
  setIsRecording,
  handleRecordingComplete,
}) => (
  <Stack className="w-2/3 flex items-center place-content-center relative">
    <Box className="w-96">
      <VideoCapture
        isRecording={isRecording}
        onRecordingComplete={handleRecordingComplete}
      />
    </Box>
    <Box className="w-1/5">
      {isRecording ? (
        <Row className="place-content-center pt-8">
          <div className="absolute h-4 w-4 rounded-full right-52 top-5 bg-red-500"></div>
          <Button variant={"solid"} onClick={() => setIsRecording(false)}>
            Stop Recording
          </Button>
          <Icon type="help" className="absolute right-5 top-5" />
        </Row>
      ) : (
        <Row className="place-content-center pt-8">
          <Button variant={"solid"} onClick={() => setIsRecording(true)}>
            Start Recording
          </Button>
          <Icon type="help" className="absolute right-5 top-5" />
        </Row>
      )}
    </Box>
  </Stack>
);




export default Onboarding;
