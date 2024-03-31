//https://recharts.org/en-US/examples/SimpleBarChart
import React, { useState, useEffect } from "react";
import BarChartIcon from '@mui/icons-material/BarChart';
import { Box, Typography } from "@mui/material";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

export default function TrainingStats(props) {
    const { fetchTrainings } = props;
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings(setTrainings)
    }, []);

    const getActivityCounts = () => {
        const counts = {};
        const durations = {};

        trainings.forEach(training => {
            const activity = training.activity.toLowerCase();
            counts[activity] = (counts[activity] || 0) + 1;
            durations[activity] = (durations[activity] || 0) + training.duration;
            //console.log(counts)
        });
        return Object.keys(counts).map(activity => ({
            activity: toTitleCase(activity),
            "Number of Bookings": counts[activity],
            "Total Duration": durations[activity] / 60,
        }));
    };


    const totalHours = () => {
        let totalDuration = 0;
        trainings.forEach(training => {
            totalDuration += training.duration;
        });
        const hours = Math.floor(totalDuration / 60);
        const minutes = totalDuration % 60;
        return `${hours} hours ${minutes} minutes`;
    };

    //https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }


    return (
        <>
            <Typography variant='h5' align="left" sx={{ pt: 2, pl: 2 }}>
                Bookings by Activity
                <BarChartIcon sx={{ fontSize: 'large', verticalAlign: 'middle', mr: 0.5, ml: 0.5 }} />
            </Typography>
            <div className="BarChartActivityAmount" style={{ display: 'flex', justifyContent: 'center', paddingTop: 50 }}>

                <ResponsiveContainer width="80%" height={600} minWidth={500}>
                    <BarChart
                        data={getActivityCounts()}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="activity" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Number of Bookings" fill="#0d47a1" />
                        <Bar dataKey="Total Duration" name="Total Duration (hours)" fill="#2196f3" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
            <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle2">Total number of bookings: {trainings.length}</Typography>
                <Typography variant="subtitle2">Total hours of bookings: {totalHours()}</Typography>
            </Box>

        </>
    );
}