import { Card, CardContent, Typography } from "@mui/material";
import Icon from "@/components/icon";
import { selectTheme } from "@/feature/settingsSlice";
import { useSelector } from "react-redux";

function DailyCard({
  day,
  temperature,
  iconNumber,
  shortPhrase,
}: {
  day: string;
  temperature: string;
  iconNumber: number;
  shortPhrase?: string;
}) {
  const theme = useSelector(selectTheme);

  return (
    <Card
      sx={{
        textAlign: "center",
        background: theme.background,
        color: theme.color,
        flex: 1,
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6">{day}</Typography>
        {Boolean(iconNumber) && <Icon number={iconNumber} />}
        <Typography sx={{ mb: 1.5 }}>{temperature}</Typography>
        {Boolean(shortPhrase) && (
          <Typography variant="body2">{shortPhrase}</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default DailyCard;
