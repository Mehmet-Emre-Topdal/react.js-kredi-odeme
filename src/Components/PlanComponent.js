import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import React, { useContext } from "react";
import ModalContext from "../store/dialog-context";
import PayBackTable from "./PayBackTable";

const PlanComponent = () => {
  const ModalCtx = useContext(ModalContext);

  const onCloseHandler = () => {
    ModalCtx.setOpen(false);
  };

  return (
    <Dialog
      open={ModalCtx.open}
      onClose={onCloseHandler}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
    >
      <DialogTitle sx={{ backgroundColor: "primary.main", py: 2, px: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <TableChartOutlinedIcon sx={{ color: "#fff" }} />
          <Typography variant="h6" fontWeight={700} color="#fff">
            Geri Ödeme Planı
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2, backgroundColor: "#f5f7fa" }}>
        <PayBackTable />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, backgroundColor: "#f5f7fa" }}>
        <Button onClick={onCloseHandler} variant="outlined" sx={{ borderRadius: 2 }}>
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanComponent;
