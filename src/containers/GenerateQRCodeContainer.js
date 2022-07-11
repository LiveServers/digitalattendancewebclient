import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import QRCode from "react-qr-code";
import moment from "moment";
import MuiButton from "../components/MuiButton";
import GenerateReport from "./GenerateReport";
import { db, collection, addDoc, setDoc, doc } from "../db/firebaseConfig";

const GenerateQRCodeContainer = React.memo(({pdfGeneratorOpen, setPdfGeneratorOpen, pdfData, setPdfData})=>{
    const [values, setValues] = React.useState({lecName:"",courseTitle:"",courseCode:"",activeSemester:"",school:""});
    const [qrCodeData, setQrCodeData] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({open:false,message:""});
    const handleChange = (event)=>{
        setValues({...values,[event.target.name]:event.target.value});
    };
    const handleGenerateQrCode = async () => {
        try{
        // submit the details and generate QR code
            setLoading(true);
            const qrCodeGenerationDate = moment(new Date()).format("YYYY-MM-DD");
            const attendanceRecordId = `${qrCodeGenerationDate}-${values.courseCode}`;
            const lecId = window?.localStorage?.getItem("uid");
            const attendaceRecordRef = collection(db, "attendance-record");
            const ds = {
                courseCode: values.courseCode,
                courseTitle: values.courseTitle,
                lecName: values.lecName,
                activeSemester: values.activeSemester,
                school: values.school,
                date: qrCodeGenerationDate,
                time: new Date().toLocaleTimeString(),
                lecId,
            }
            const res = await setDoc(doc(attendaceRecordRef, attendanceRecordId), ds);
            const docId= res?.id;
            ds.uid = docId;
            const qrData = JSON.stringify(ds);
            setQrCodeData(qrData);
            setValues({lecName:"",courseTitle:"",courseCode:"",activeSemester:"",school:""});
            setLoading(false);
            setError({open:false,message:""});
        }catch(e){
            setError({open:true,message:e.message});
            setLoading(false);
            console.log("AN ERROR OCCURED", e);
        }
    }
    return (
        <>
            {
                error.open && (
                    <>
                        <Alert variant="filled" severity="error" onClose={() => setError({open:false,message:""})}>{error.message}</Alert>
                    </>
                )
            }
            {
                pdfGeneratorOpen ? (
                    <>
                        <Grid container direction="column" alignItems="center" sx={{width:"100%", backgroundColor:"#5D92F3"}}>
                                <GenerateReport pdfData={pdfData} setPdfData={setPdfData} pdfGeneratorOpen={pdfGeneratorOpen} setPdfGeneratorOpen={setPdfGeneratorOpen}  />
                        </Grid>
                    </>
                ):(
                    <>
                        <Box sx={{display:"grid",gridTemplateColumns:"60% 40%", gridTemplateRows:"1fr", width:"100%", height:"100vh"}}>
                            <Grid container alignItems="center" justifyContent="center" wrap="nowrap" direction="row">
                                <Grid sx={{width:"auto",marginRight:"20px"}} container alignItems="center" justifyContent="flex-start" wrap="nowrap" direction="column">
                                    <Typography sx={{marginBottom: 2}} variant="body1">Generate QR Code</Typography>
                                    <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.lecName} type="text" onChange={handleChange} name="lecName" label="Lecturer Name" />
                                    <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.courseTitle} type="text" onChange={handleChange} name="courseTitle" label="Course Title" />
                                    <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.courseCode} type="text" onChange={handleChange} name="courseCode" label="Course Code" />
                                    <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.activeSemester} type="text" onChange={handleChange} name="activeSemester" label="Active Semester" />
                                    <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.school} type="text" onChange={handleChange} name="school" label="School" />
                                    <Grid container sx={{marginTop: 2}} direction="row" alignItems="center" justifyContent="center" wrap="nowrap">
                                        {
                                        loading ? (
                                            <CircularProgress />
                                        ):(
                                            <MuiButton onClick={()=>handleGenerateQrCode()} disabled={Object.values(values).some((item)=> item === "")} height={30} variant="contained" text="GENERATE" />
                                        )       
                                        }                     
                                    </Grid>
                                </Grid>
                                {
                                    qrCodeData !== "" && (
                                        <>
                                            <Grid>
                                                <QRCode size={350} value={qrCodeData} />
                                            </Grid>
                                        </>
                                    )
                                }
                            </Grid>
                            <Grid container direction="column" alignItems="center" sx={{width:"100%", backgroundColor:"#5D92F3"}}>
                                <p style={{alignItems:"center"}}>Generate report</p>
                                <GenerateReport pdfData={pdfData} setPdfData={setPdfData} pdfGeneratorOpen={pdfGeneratorOpen} setPdfGeneratorOpen={setPdfGeneratorOpen} />
                            </Grid>
                        </Box>
                    </>
                )
            }
        </>
    )
});

export default GenerateQRCodeContainer;