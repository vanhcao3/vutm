import * as React from "react";
import { AppBar, Box, Button, Container, Toolbar, Typography, Paper, Stack } from "@mui/material";

import Grid from "@mui/material/GridLegacy";

import { useAuth } from "@/lib/auth";
import bgImage from "@/assets/images/loginBg.png";

const Hero: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
     return (
          <Box
               sx={{
                    position: "relative",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
               }}
          >
               <AppBar
                    position="fixed"
                    color="transparent"
                    elevation={0}
                    sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
               >
                    <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
                         <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
                              AirTrans Sys
                         </Typography>
                         <Stack direction="row" spacing={1} alignItems="center">
                              <Button
                                   variant="outlined"
                                   sx={{
                                        ml: 1,
                                        borderColor: "rgba(255,255,255,0.5)",
                                        color: "#fff",
                                        textTransform: "none",
                                   }}
                              >
                                   Liên hệ
                              </Button>
                              <Button
                                   onClick={onLogin}
                                   variant="contained"
                                   color="primary"
                                   sx={{
                                        ml: 1,
                                        textTransform: "none",
                                        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                                   }}
                              >
                                   Đăng nhập
                              </Button>
                         </Stack>
                    </Toolbar>
               </AppBar>
               <Container
                    maxWidth={false}
                    disableGutters
                    sx={{ position: "relative", zIndex: 1, flex: 1, px: { xs: 2, sm: 3, md: 8 } }}
               >
                    <Box sx={{ display: "flex", alignItems: "flex-start", height: "100%" }}>
                         <Box
                              sx={{
                                   width: { xs: "100%", md: "66%" },
                                   color: "#fff",
                                   pt: "25vh",
                              }}
                         >
                              <Typography
                                   variant="h1"
                                   sx={{
                                        fontSize: { xs: 48, md: 88 },
                                        lineHeight: 1.02,
                                        fontWeight: 800,
                                        letterSpacing: -1.5,
                                   }}
                              >
                                   Kỷ nguyên mới của vận tải drone lấy AI làm cốt lõi
                              </Typography>
                              <Box sx={{ height: 16 }} />
                              <Box
                                   sx={{
                                        width: 96,
                                        height: 4,
                                        bgcolor: "primary.main",
                                        borderRadius: 2,
                                        mb: 2,
                                   }}
                              />
                              <Typography
                                   variant="h6"
                                   sx={{ color: "rgba(255,255,255,0.9)", maxWidth: 880, mb: 4 }}
                              >
                                   AirTrans Sys vận hành nền tảng vận tải drone cho đô thị hiện đại.
                                   Tối ưu lộ trình tức thì, theo dõi thời gian thực và phân tích đội
                                   bay chuyên sâu — tất cả trong một nền tảng.
                              </Typography>
                              <Stack direction="row" spacing={2}>
                                   <Button
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        onClick={onLogin}
                                        sx={{ textTransform: "none" }}
                                   >
                                        Bắt đầu ngay
                                   </Button>
                                   <Button
                                        size="large"
                                        variant="outlined"
                                        sx={{
                                             textTransform: "none",
                                             borderColor: "rgba(255,255,255,0.5)",
                                             color: "#fff",
                                        }}
                                   >
                                        Xem demo
                                   </Button>
                              </Stack>
                         </Box>
                    </Box>
               </Container>
          </Box>
     );
};

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
     <Paper
          elevation={4}
          sx={{
               p: 3,
               height: "100%",
               bgcolor: (theme) => (theme.palette.mode === "light" ? "#0b0f16" : "#10151f"),
               color: "#dbe6ff",
               borderRadius: 3,
               border: "1px solid rgba(255,255,255,0.08)",
               backdropFilter: "blur(4px)",
          }}
     >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#fff" }}>
               {title}
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)" }}>
               {description}
          </Typography>
     </Paper>
);

export const LandingPage: React.FC = () => {
     const { login } = useAuth();

     const handleLogin = React.useCallback(() => {
          const redirectPath = window.location.origin;
          login(redirectPath);
     }, [login]);

     return (
          <Box
               sx={{
                    position: "relative",
                    bgcolor: "background.default",
                    color: "text.primary",
                    backgroundImage: `url(${bgImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
               }}
          >
               <Box
                    sx={{
                         position: "absolute",
                         inset: 0,
                         background:
                              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)",
                         zIndex: 0,
                         pointerEvents: "none",
                    }}
               />
               <Hero onLogin={handleLogin} />

               <Container
                    maxWidth="lg"
                    sx={{ py: { xs: 8, md: 12 }, position: "relative", zIndex: 1 }}
               >
                    <Grid container spacing={3}>
                         <Grid item xs={12} md={4}>
                              <FeatureCard
                                   title="Tự động tối ưu lộ trình"
                                   description="Tối ưu đường bay bằng AI để giảm chi phí và thời gian, tuân thủ vùng bay và quy định."
                              />
                         </Grid>
                         <Grid item xs={12} md={4}>
                              <FeatureCard
                                   title="Theo dõi thời gian thực"
                                   description="Theo dõi từng drone trực tiếp với dữ liệu telemetry chi tiết, giám sát tình trạng và cảnh báo tức thời."
                              />
                         </Grid>
                         <Grid item xs={12} md={4}>
                              <FeatureCard
                                   title="Phân tích đội bay"
                                   description="Đo lường mức sử dụng, SLA và hiệu năng lộ trình để liên tục tối ưu vận hành."
                              />
                         </Grid>
                    </Grid>

                    <Paper
                         elevation={0}
                         sx={{
                              mt: { xs: 8, md: 12 },
                              p: { xs: 4, md: 6 },
                              borderRadius: 3,
                              textAlign: "center",
                              background:
                                   "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(20,30,54,1) 50%, rgba(10,14,24,1) 100%)",
                              color: "#e5edff",
                         }}
                    >
                         <Typography variant="h5" sx={{ fontWeight: 700 }}>
                              Sẵn sàng hiện đại hóa hoạt động vận tải drone?
                         </Typography>
                         <Typography variant="body1" sx={{ mt: 1, mb: 3, opacity: 0.85 }}>
                              SSO an toàn, độ tin cậy cấp doanh nghiệp và trải nghiệm hiện đại cho
                              đội ngũ của bạn.
                         </Typography>
                         <Stack direction="row" spacing={2} justifyContent="center">
                              <Button
                                   variant="contained"
                                   size="large"
                                   onClick={handleLogin}
                                   sx={{ textTransform: "none" }}
                              >
                                   Đăng nhập bằng C4I SSO
                              </Button>
                              <Button
                                   variant="outlined"
                                   size="large"
                                   sx={{ textTransform: "none" }}
                              >
                                   Liên hệ kinh doanh
                              </Button>
                         </Stack>
                    </Paper>
               </Container>

               <Box
                    component="footer"
                    sx={{
                         py: 6,
                         textAlign: "center",
                         opacity: 0.7,
                         position: "relative",
                         zIndex: 1,
                    }}
               >
                    <Typography variant="body2">
                         © {new Date().getFullYear()} AirTrans Sys
                    </Typography>
               </Box>
          </Box>
     );
};

export default LandingPage;
