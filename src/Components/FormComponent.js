import { Button, Card, CardContent, Grid, Box, Typography } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";
import React, { useEffect, useState, useRef, useContext } from "react";
import AppContext from "../store/app-context";
import ModalContext from "../store/dialog-context";
import FormInputs from "./FormInputs";
import Info from "./Info";

export default function FormComponent() {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const ModalCtx = useContext(ModalContext);
  const ctx = useContext(AppContext);

  const inputsRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(inputsRef.current.validateInputs());
    setIsSubmit(true);
  };

  useEffect(() => {
    const formInputs = inputsRef.current.getFormValues();

    if (Object.keys(formErrors).length === 0 && isSubmit === true) {
      ctx.setData({ ...formInputs });
      setIsSubmit(false);
      ModalCtx.setOpen(true);
    }
  }, [formErrors]);

  return (
    <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
      <Box sx={{ backgroundColor: "primary.main", px: 4, py: 2.5 }}>
        <Typography variant="h6" fontWeight={700} color="white">
          Kredi Bilgilerini Girin
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}>
          Formu doldurun ve geri ödeme planınızı oluşturun
        </Typography>
      </Box>

      <CardContent sx={{ px: 4, py: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <form onSubmit={onSubmitHandler}>
              <FormInputs ref={inputsRef} />
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<CalculateIcon />}
                sx={{ mt: 3, px: 4, py: 1.2 }}
              >
                Hesapla
              </Button>
            </form>
          </Grid>

          <Grid item xs={12} md={6}>
            <Info />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
