import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import moment from "moment";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
import MuiButton from "../components/MuiButton";
import { db, doc, getDoc } from "../db/firebaseConfig";

const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      color: "#000",
    },
    lecDetails: {
      margin: 10,
      padding: 10,
      display:"flex",
      width:"100%",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between",
    },
    lecName: {
        display:"flex",
        width:"auto",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
    },
    studentDetails:{
        margin: 10,
        padding: 10,
        display:"flex",
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    details:{
        display:"flex",
        width:"auto",
        flexDirection:"column",
        alignItems:"flex-start",
        justifyContent:"center",
    },
    viewer: {
      width: "100vw",
      height: "100vh",
    },
    header:{
        padding:"10px",
        backgroundColor:"#5D92F3",
        marginBottom: "10px",
        color:"#000",
        maxWidth:"300px",
        width:"300px",
    },
    stdRow:{
        padding:"10px",
        backgroundColor:"#F9FAFB",
        marginBottom:"4px",
        color:"#000",
        maxWidth:"300px",
        width:"300px",
    }
  });

const GenerateReport = ({setPdfGeneratorOpen, pdfGeneratorOpen, pdfData, setPdfData}) => {
    const [values, setValues] = React.useState({courseCode:"",filterDate: moment(new Date()).format("YYYY-MM-DD")});
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({open:false,message:""});
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value});
    }
    const generateReport = () => {
        return (
            <PDFViewer style={styles.viewer}>
              {/* Start of the document*/}
              <Document
                author="Brian Kyole"
                keywords="student, attendance"
                subject="The attendance list for BSCS 210"
                title="Attendance"
              >
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                  <View style={styles.lecDetails}>
                    <View style={styles.lecName}>
                        <Text>Lecturer Name: </Text>
                        <Text>{pdfData.lecName}</Text>
                    </View>
                    <View style={styles.lecName}>
                        <Text>Date:</Text>
                        <Text>{pdfData.date}</Text>
                    </View>
                  </View>
                  <View style={styles.lecDetails}>
                    <View style={styles.lecName}>
                        <Text>Course Name: </Text>
                        <Text>{pdfData.courseTitle}</Text>
                    </View>
                    <View style={styles.lecName}>
                        <Text>Course Code:</Text>
                        <Text>{pdfData.courseCode}</Text>
                    </View>
                  </View>
                  <View style={styles.studentDetails}>
                        <View style={styles.details}>
                            <Text style={styles.header}>No. </Text>
                            <Text style={styles.stdRow}>1</Text>
                            <Text style={styles.stdRow}>2</Text>
                            <Text style={styles.stdRow}>3</Text>
                            <Text style={styles.stdRow}>4</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.header}>Student Name</Text>
                            <Text style={styles.stdRow}>Brian Kyole Mwau</Text>
                            <Text style={styles.stdRow}>John Wahome</Text>
                            <Text style={styles.stdRow}>Samuel Mwangi</Text>
                            <Text style={styles.stdRow}>Marvin Mureithi</Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.header}>Registration Number</Text>
                            <Text style={styles.stdRow}>ICT-G-4-0726-18</Text>
                            <Text style={styles.stdRow}>ICT-G-4-0436-18</Text>
                            <Text style={styles.stdRow}>ICT-G-4-0564-18</Text>
                            <Text style={styles.stdRow}>ICT-G-4-0675-18</Text>
                        </View>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
        )
    }  
    const handleFilterRecords = async () => {
        try{
            // fetch data to generate pdf
            setLoading(true);
            const attendanceRecordId = `${values.filterDate}-${values.courseCode}`;
            const attendaceRecordRef = doc(db, "attendance-record", attendanceRecordId);
            const attendaceRecordSnap = await getDoc(attendaceRecordRef);
            if (attendaceRecordSnap.exists()) {
                const data = attendaceRecordSnap.data();
                setPdfData(data);
                setValues({courseCode:"",filterDate: moment(new Date()).format("YYYY-MM-DD")});
                setPdfGeneratorOpen(true);
            } else {
                setValues({courseCode:"",filterDate: moment(new Date()).format("YYYY-MM-DD")});
                setError({open:true,message:"No such document!"});
            }
            setLoading(false);
        }catch(e){
            setValues({courseCode:"",filterDate: moment(new Date()).format("YYYY-MM-DD")});
            setLoading(false);
            setError({open:true,message:e.message});
            console.log("AN ERROR OCCURED", e);
        }
    }
    return (
        <>
            {
                pdfGeneratorOpen ? (
                    <>
                        {generateReport()}
                    </>
                ):(
                    <>
                        {
                            error.open && (
                                <>
                                    <Alert variant="filled" severity="error" onClose={() => setError({open:false,message:""})}>{error.message}</Alert>
                                </>
                            )
                        }
                        <Grid sx={{marginTop:"30px"}} container direction="column" alignItems="center">
                            <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.courseCode} type="text" onChange={handleChange} name="courseCode" label="Course Code" />
                            <TextField autoComplete="off" sx={{marginBottom: 2,"& .css-lqfcw6-MuiInputBase-input-MuiOutlinedInput-input":{color:"#000"}}} required value={values.filterDate} type="date" onChange={handleChange} name="filterDate" label="Filter Date" />
                            <Grid container sx={{width:"100%",marginTop: 2}} direction="row" alignItems="center" justifyContent="center" wrap="nowrap">
                                {
                                    loading ? (
                                        <CircularProgress />
                                    ):(
                                        <MuiButton disabled={Object.values(values).some(item=>item ==="")} sx={{backgroundColor:"#fff",color:"#000"}} onClick={() => handleFilterRecords()} height={30} variant="contained" text="GENERATE REPORT" />
                                    )
                                }                    
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </>
    )
}

export default GenerateReport;