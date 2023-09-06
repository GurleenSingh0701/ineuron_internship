import React, { useEffect, useState } from "react";
import "../Css Files/Questions.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
function Questions() {
  const [questions, setQuestions] = useState([{}]);
  useEffect(() => {
    axios
      .get("/all-questions")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="all-questions">
      {questions?.info?.map((item, i) => {
        return (
          <div>
            <Accordion
              expanded={expanded === `panel${i + 1}`}
              onChange={handleChange(`panel${i + 1}`)}
              className="accordions"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${i+1}a-content`}
                id={`panel${i + 1}a-header`}
                className="accordions-summary"
              >
                <Typography>
                  Q{i + 1}. {item.Question}{" "}?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Ans:- {item.Answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}

export default Questions;
