import { useEffect, useState } from "react"
import { getLesson } from "../utils/api";
import { useParams } from "react-router-dom";
import { CardContent, Container, Typography, Card, Divider } from "@mui/material";

export const StudentSingleLessonList = () => {
    const [lesson, setLesson] = useState([]);
    const [loading, setLoading] = useState(true);
    const { lesson_id } = useParams();

    useEffect(()=> {
        getLesson(lesson_id).then(({lessons}) => {
            setLesson(lessons);
            setLoading(false);
        })
    },[])

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h3" gutterBottom sx={{textDecoration: "underline"}}>{lesson.title}</Typography>
                    <Typography gutterBottom>{lesson.body}</Typography>
                    <Typography>{(new Date(lesson.created_at)).toLocaleDateString()}</Typography>
                </CardContent>
            </Card>
        </Container>
    )
}