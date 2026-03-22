import { Box, Typography, Divider, Alert } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import React from "react";

const Info = () => {
  return (
    <Box
      sx={{
        borderLeft: { md: "3px solid #e3ecf7", xs: 0 },
        borderTop: { xs: "3px solid #e3ecf7", md: 0 },
        pl: { md: 3, xs: 0 },
        pt: { xs: 3, md: 0 },
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <InfoOutlinedIcon color="primary" />
        <Typography variant="h6" fontWeight={700} color="primary">
          MET BANK'a Hoşgeldiniz
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        Yandaki formu doldurarak aldığınız kredi için geri ödeme planınızı oluşturabilirsiniz.
      </Typography>

      <Divider sx={{ my: 2.5 }} />

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
        <HelpOutlineIcon sx={{ color: "secondary.main", fontSize: 20 }} />
        <Typography variant="subtitle2" fontWeight={700} sx={{ color: "secondary.main" }}>
          BSMV ve KKDF Nedir?
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        <strong>BSMV</strong> (Banka ve Sigorta Muameleleri Vergisi) ve <strong>KKDF</strong> (Kaynak
        Kullanımını Destekleme Fonu), kredinin brüt tutarı üzerinden hesaplanan yasal vergilerdir.
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mt: 1.5 }}>
        Türkiye'de standart KKDF oranı <strong>%15</strong>, BSMV oranı ise <strong>%5</strong>'tir.
      </Typography>

      <Alert severity="info" sx={{ mt: 2, borderRadius: 2, fontSize: "0.8rem" }}>
        Konut kredisi kullanıyorsanız BSMV ve KKDF alanlarına <strong>0</strong> giriniz.
      </Alert>
    </Box>
  );
};

export default Info;
