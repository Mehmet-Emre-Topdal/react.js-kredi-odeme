import {
  Box,
  Card,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/app-context";
import ModalContext from "../store/dialog-context";

// Cached formatter — create once, reuse on every call
const formatter = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" });
const fmt = (value) => formatter.format(value);

// Static style objects — defined outside component to avoid recreation on every render
const headCellSx = {
  backgroundColor: "primary.main",
  color: "#fff",
  fontWeight: 700,
  fontSize: "0.78rem",
  whiteSpace: "nowrap",
};

const rowSx = {
  "&:nth-of-type(odd)": { backgroundColor: "#f5f8ff" },
  "&:last-child td, &:last-child th": { border: 0 },
  "&:hover": { backgroundColor: "#ddeeff" },
};

// Pure calculation helpers — outside component, no state dependency
const normalizeInterestParams = (rate, time, timeInterval) => {
  const periodDays = timeInterval === "annual" ? 360 : 30;
  const normalizedTime =
    timeInterval === "annual" || timeInterval === "monthly" ? time * 30 : time;
  return { rate: rate / 100, time: normalizedTime, periodDays };
};

const calculateSimpleInterest = (principal, rate, time, timeInterval = "monthly") => {
  const p = normalizeInterestParams(rate, time, timeInterval);
  return (principal * p.rate * p.time) / p.periodDays;
};

const calculateCompoundInterest = (principal, rate, time, timeInterval) => {
  const p = normalizeInterestParams(rate, time, timeInterval);
  return principal * Math.pow(1 + p.rate, p.time / p.periodDays);
};

const PayBackTable = () => {
  const [plan, setPlan] = useState([]);
  const [totals, setTotals] = useState({ totalPayment: 0, totalTax: 0 });

  const ctx = useContext(AppContext);
  const modalContext = useContext(ModalContext);

  useEffect(() => {
    if (!modalContext.open) return;

    let { loanAmount } = ctx.data;
    const { profitRate, numOfInstallments, kkdfRate, bsmvRate, installmentInterval } = ctx.data;

    let totalTax = 0;
    const arr = [];

    const totalPayment = calculateCompoundInterest(
      loanAmount,
      profitRate,
      numOfInstallments,
      installmentInterval
    );
    // Use + prefix so toFixed returns a number, not a string
    const installment = +(totalPayment / numOfInstallments).toFixed(2);

    for (let i = 0; i < numOfInstallments; i++) {
      const profit = +calculateSimpleInterest(loanAmount, profitRate, 1, installmentInterval).toFixed(2);
      const kkdf = +((profit * kkdfRate) / 100).toFixed(2);
      const bsmv = +((profit * bsmvRate) / 100).toFixed(2);
      const isLastInstallment = i === numOfInstallments - 1;
      const principal = isLastInstallment
        ? +loanAmount
        : +(installment - profit - kkdf - bsmv).toFixed(2);
      loanAmount = isLastInstallment ? 0 : +(loanAmount - principal).toFixed(2);

      totalTax = totalTax + kkdf + bsmv;

      arr.push({
        monthNo: i + 1,
        installment,
        principal,
        profit,
        kkdf,
        bsmv,
        loanAmount,
      });
    }

    setPlan(arr);
    setTotals({ totalTax, totalPayment });
  }, [modalContext.open]);

  return (
    <Card sx={{ p: 0, borderRadius: 3, overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: "58vh" }} elevation={0}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={headCellSx}>#</TableCell>
              <TableCell sx={headCellSx} align="right">Taksit Tutarı</TableCell>
              <TableCell sx={headCellSx} align="right">Ana Para</TableCell>
              <TableCell sx={headCellSx} align="right">Kalan Ana Para</TableCell>
              <TableCell sx={headCellSx} align="right">Kar Tutarı</TableCell>
              <TableCell sx={headCellSx} align="right">KKDF</TableCell>
              <TableCell sx={headCellSx} align="right">BSMV</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plan.map((value) => (
              <TableRow key={value.monthNo} sx={rowSx}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: "primary.main" }}>
                  {value.monthNo}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{fmt(value.installment)}</TableCell>
                <TableCell align="right">{fmt(value.principal)}</TableCell>
                <TableCell align="right">{fmt(value.loanAmount)}</TableCell>
                <TableCell align="right">{fmt(value.profit)}</TableCell>
                <TableCell align="right" sx={{ color: "secondary.main" }}>{fmt(value.kkdf)}</TableCell>
                <TableCell align="right" sx={{ color: "secondary.main" }}>{fmt(value.bsmv)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          px: 2.5,
          py: 2,
          backgroundColor: "primary.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Toplam Ödeme:
          </Typography>
          <Chip
            label={fmt(totals.totalPayment)}
            size="small"
            sx={{ backgroundColor: "#fff", fontWeight: 700, color: "primary.main" }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
            Toplam Vergi:
          </Typography>
          <Chip
            label={fmt(totals.totalTax)}
            size="small"
            sx={{ backgroundColor: "#ffebee", fontWeight: 700, color: "secondary.main" }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default PayBackTable;
