import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useForm, Resolver, SubmitHandler, Controller } from "react-hook-form";
import { CampaignForm } from "../../../interfaces";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const schema = yup.object().shape({
  name: yup.string().required(),
  subject: yup.string().required(),
  status: yup.string().required(),
  hours: yup.string().required(),
  issuer: yup.string().required(),
  course_name: yup.string().required(),
  template: yup.string().required(),
  contacts: yup.string().required(),
  userId: yup.string().required(),
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "50%",
};

export default function AddCampaignForm(props: any) {
  const handleClose = () => props.state.setOpen(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignForm>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<CampaignForm> = (data) => console.log(data);
  const onInvalid = (errors: any) => console.error(errors);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.state.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.state.open}>
          <Box sx={style}>
            <Grid container spacing={1}>
              <Grid item md={8}>
                <h1>Create Campaign</h1>
              </Grid>
              <Grid item md={4}>
                <Button onClick={handleClose}>Close modal</Button>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="name">Campaign Name</label>&nbsp;
                </Grid>
                <Grid item md={8}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="fullWidth"
                        type="text"
                        name="name"
                        size="small"
                      />
                    )}
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="subject">Subject</label>
                </Grid>
                <Grid item md={8}>
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="fullWidth"
                        type="text"
                        name="name"
                        size="small"
                      />
                    )}
                  />
                  {errors.subject && <p>{errors.subject.message}</p>}
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="template">Select Template</label>
                </Grid>
                <Grid item md={8}>
                  <Controller
                    name="template"
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <RadioGroup
                          {...field}
                          defaultValue="Template1"
                          name="template"
                        >
                          <FormControlLabel
                            value="Template1"
                            control={<Radio />}
                            label="Template 1"
                          />
                          <FormControlLabel
                            value="Template2"
                            control={<Radio />}
                            label="Template 1"
                          />
                          <FormControlLabel
                            value="Template3"
                            control={<Radio />}
                            label="Template 3"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="issuer">Issuer Name</label>
                </Grid>
                <Grid item md={8}>
                  <Controller
                    name="issuer"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        id="fullWidth"
                        type="text"
                        name="name"
                        size="small"
                      />
                    )}
                  />
                  {errors.issuer && <p>{errors.issuer.message}</p>}
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="month">Month</label>
                </Grid>
                <Grid item md={8}>
                  <input type="month" name="month" id="" required />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="year">Year</label>
                </Grid>
                <Grid item md={8}>
                  <input type="date" name="year" id="" required />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="bill-amount">Bill Amount</label>
                </Grid>
                <Grid item md={8}>
                  <input type="number" name="bill-amount" id="" required />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}>
                  <label htmlFor="contacts">Select Contacts</label>
                </Grid>
                <Grid item md={8}>
                  <select name="contacts" id="" required>
                    <option selected disabled>
                      Select
                    </option>
                  </select>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={1}>
                <Grid item md={3}></Grid>
                <Grid item md={8}>
                  <Button variant="outlined" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
