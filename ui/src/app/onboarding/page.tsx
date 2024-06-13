"use client";

import React, { useState } from "react";
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
} from "../../components/ui";
import FormComponent from "./components/FormComponent";
import { SubmitHandler } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
  dateOfBirth: z.string().refine((val: string) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  video: z.instanceof(Blob, { message: "Video is required" }),
});

type FormData = z.infer<typeof schema>;

const Onboarding: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoFile, setVideoFile] = useState<Blob | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRecordingComplete = (recordedChunks: Blob[]) => {
    const videoBlob = new Blob(recordedChunks, { type: "video/webm" });
    setVideoFile(videoBlob);
    console.log("Final video blob:", videoBlob);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("onSubmit called with data:", data);

    if (videoFile) {
      console.log("Video file exists in onSubmit:", videoFile);
      data.video = videoFile;

      console.log("Form data with video:", data);

      setIsSubmitted(true);
    } else {
      console.error("Video is required in onSubmit");
    }
  };

  return (
    <Box className="bg-primary-50">
      <Stack>
        <Gradient />
        <Row className="w-full pt-14 px-20 items-center">
          <Stack className="w-1/3 flex">
            {isSubmitted ? (
              <Text>User registered!</Text>
            ) : (
              <FormComponent videoFile={videoFile} onSubmit={onSubmit} />
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
  <Stack className="w-2/3 flex items-center place-content-center">
    <Box className="w-96">
      <VideoCapture
        isRecording={isRecording}
        onRecordingComplete={handleRecordingComplete}
      />
    </Box>
    <Box className="w-1/5 relative">
      {isRecording ? (
        <Row className="place-content-center pt-8">
          <Button variant={"solid"} onClick={() => setIsRecording(false)}>
            Stop Recording
          </Button>
          <Icon type="help" className="absolute -right-5 top-5" />
        </Row>
      ) : (
        <Row className="place-content-center pt-8">
          <Button variant={"solid"} onClick={() => setIsRecording(true)}>
            Start Recording
          </Button>
          <Icon type="help" className="absolute -right-5 top-5" />
        </Row>
      )}
    </Box>
  </Stack>
);

const InfoSection = () => (
  <Stack className="p-14 items-center place-content-center">
    <Box className="p-10 shadow-md rounded-md bg-white text-xl w-full ">
      <Text as="a" weight="bold" className="shadow-inner bg-white">
        Hello, this is a registration form where you can register with a video
        of yourself! &lt;br /&gt; We will use this video to create biometrics,
        so you get access into the company and won&apos;t need to use a badge or
        card.
      </Text>
    </Box>
    <Row className="pt-14 space-x-10">
      <Box className="w-1/2">
        <Stack>
          <Text size={"lg"} weight={"bold"} className="pb-5">
            About UUFT.Ai
          </Text>
          <Text as="a">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus vero reiciendis quae porro, voluptates odit. Culpa
            ipsam beatae voluptas vitae est repudiandae, nulla atque, reiciendis
            labore, voluptatibus eum dolorem! Id inventore quidem ipsam impedit
            possimus?
          </Text>
        </Stack>
      </Box>
      <Box className="w-1/2">
        <Stack>
          <Text size={"lg"} weight={"bold"} className="pb-5">
            About UUFT.Ai
          </Text>
          <Text as="a">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus vero reiciendis quae porro, voluptates odit. Culpa
            ipsam beatae voluptas vitae est repudiandae, nulla atque, reiciendis
            labore, voluptatibus eum dolorem! Id inventore quidem ipsam impedit
            possimus?
          </Text>
        </Stack>
      </Box>
    </Row>
    <Box>
      <Socials size={"lg"} className="pt-16" />
    </Box>
  </Stack>
);

export default Onboarding;
