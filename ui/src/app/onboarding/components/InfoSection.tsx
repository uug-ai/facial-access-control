import { Stack, Box, Text, Row, Socials } from "@uug-ai/ui";

export const InfoSection = () => (
    <Stack className="p-14 items-center place-content-center">
      <Box className="p-10 shadow-md rounded-md bg-white text-xl w-full ">
        <Text as="a" weight="bold" className="shadow-inner bg-white" />
        Hello, this is a registration form where you can register with a video of
        yourself! <br />
        We will use this video to create biometrics, so you get access into the
        company and won't need to use a badge or card.
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