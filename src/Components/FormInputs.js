import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const FormInputs = forwardRef(function FormInputs(props, ref) {
  const initialValues = {
    loanAmount: "",
    profitRate: "",
    installmentInterval: "",
    numOfInstallments: "",
    bsmvRate: "5",
    kkdfRate: "15",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (values.loanAmount === "") {
      errors.loanAmount = "Bu alan boş bırakılamaz";
    } else if (+values.loanAmount <= 0) {
      errors.loanAmount = "Lütfen sıfırdan büyük bir değer giriniz";
    }

    if (values.profitRate === "") {
      errors.profitRate = "Bu alan boş bırakılamaz";
    } else if (+values.profitRate <= 0) {
      errors.profitRate = "Lütfen sıfırdan büyük bir değer giriniz";
    }

    if (values.installmentInterval === "") {
      errors.installmentInterval = "Lütfen taksit aralığı seçiniz";
    }

    if (values.numOfInstallments === "") {
      errors.numOfInstallments = "Bu alan boş bırakılamaz";
    } else if (+values.numOfInstallments <= 0) {
      errors.numOfInstallments = "Lütfen sıfırdan büyük bir değer giriniz";
    }

    if (values.bsmvRate === "") {
      errors.bsmvRate = "Bu alan boş bırakılamaz";
    } else if (+values.bsmvRate < 0) {
      errors.bsmvRate = "Lütfen sıfır veya sıfırdan büyük bir değer giriniz";
    }

    if (values.kkdfRate === "") {
      errors.kkdfRate = "Bu alan boş bırakılamaz";
    } else if (+values.kkdfRate < 0) {
      errors.kkdfRate = "Lütfen sıfır veya sıfırdan büyük bir değer giriniz";
    }

    setFormErrors({ ...errors });
    return { ...errors };
  };

  const clear = () => {
    setFormValues(initialValues);
    setFormErrors({});
  };

  useImperativeHandle(
    ref,
    () => ({
      getFormValues: () => formValues,
      getFormErrors: () => formErrors,
      validateInputs: () => validate(formValues),
      clearInputs: () => clear(),
    }),
    [formValues, formErrors]
  );

  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.7rem" }}>
          Kredi Bilgileri
        </Typography>
        <TextField
          name="loanAmount"
          label="Kredi Tutarı"
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
          value={formValues.loanAmount}
          error={!!formErrors.loanAmount}
          helperText={formErrors.loanAmount}
          InputProps={{
            startAdornment: <InputAdornment position="start">₺</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          name="profitRate"
          label="Kar Oranı"
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
          value={formValues.profitRate}
          error={!!formErrors.profitRate}
          helperText={formErrors.profitRate}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth variant="outlined" error={!!formErrors.installmentInterval}>
          <InputLabel id="installment-interval-label">Taksit Aralığı</InputLabel>
          <Select
            labelId="installment-interval-label"
            name="installmentInterval"
            label="Taksit Aralığı"
            onChange={onChangeHandler}
            defaultValue=""
            value={formValues.installmentInterval}
          >
            <MenuItem value={"monthly"}>Aylık</MenuItem>
            <MenuItem value={"annual"}>Yıllık</MenuItem>
            <MenuItem value={"daily"}>Günlük</MenuItem>
          </Select>
          <FormHelperText>{formErrors.installmentInterval}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          name="numOfInstallments"
          label="Taksit Sayısı"
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
          value={formValues.numOfInstallments}
          error={!!formErrors.numOfInstallments}
          helperText={formErrors.numOfInstallments}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontSize: "0.7rem" }}>
          Vergi Oranları
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          name="bsmvRate"
          label="BSMV Oranı"
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
          value={formValues.bsmvRate}
          error={!!formErrors.bsmvRate}
          helperText={formErrors.bsmvRate}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          name="kkdfRate"
          label="KKDF Oranı"
          type="number"
          fullWidth
          variant="outlined"
          onChange={onChangeHandler}
          value={formValues.kkdfRate}
          error={!!formErrors.kkdfRate}
          helperText={formErrors.kkdfRate}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>
    </Grid>
  );
});

export default FormInputs;
