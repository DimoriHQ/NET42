import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import FormError from "../Form/FormError";
import Upload from "../Form/Upload";

type CreateCampaignForm = {
  name: string;
  description: string;
  image: string;
  banner: string;
  tracks: { track: string; image: string }[];
  trackable: string;
  standardCode: string;
};

const CreateCampaign: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateCampaignForm>({ defaultValues: { trackable: "1", tracks: [{ track: "" }] } });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ control, name: "tracks" });

  const values = watch();

  const onSubmit: SubmitHandler<CreateCampaignForm> = (data) => console.log(data);

  return (
    <div className="max-w-lg w-full mx-auto">
      <div className="mb-6">
        <Typography level="h1">Create campaign</Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 flex-col">
          <Input {...register("name", { required: "Name is required" })} placeholder="Campaign name" variant="outlined" />
          <FormError label={errors.name} />
          <Textarea {...register("description", { required: "Description is required" })} placeholder="Campaign description" variant="outlined" minRows={4} />
          <FormError label={errors.description} />
          <Upload label="Banner" />
          <Upload label="Thumbnail" />
          <RadioGroup defaultValue="1">
            <Radio value="1" {...register("trackable")} label="Offline campaign" variant="outlined" />
            <Radio value="0" {...register("trackable")} label="Online campaign" variant="outlined" disabled />
          </RadioGroup>
          {values.trackable === "0" && (
            <Input {...register("standardCode", { required: values.trackable === "0" ? "Standard code is required" : false })} placeholder="Standard code" variant="outlined" />
          )}
          {values.trackable === "1" && (
            <>
              <Upload label="Registered Medal" />
              <Upload label="Unfinished Medal" />
              {fields.map((field, index) => (
                <Input
                  key={field.id}
                  {...register(`tracks.${index}.track`, { required: values.trackable === "1" ? "Tracks is required" : false })}
                  placeholder="Track (m)"
                  variant="outlined"
                  sx={{ "--Input-decoratorChildHeight": "45px" }}
                  endDecorator={
                    <div className="flex items-center gap-3">
                      <Upload label="Medal Image" sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                      {index === fields.length - 1 ? (
                        <Button
                          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                          onClick={() => {
                            append({ track: "", image: "" });
                          }}
                        >
                          +
                        </Button>
                      ) : (
                        <Button
                          sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          -
                        </Button>
                      )}
                    </div>
                  }
                />
              ))}
            </>
          )}

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
