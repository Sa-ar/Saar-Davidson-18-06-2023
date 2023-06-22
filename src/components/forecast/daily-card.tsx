import { Card, CardContent, Typography } from "@mui/material";
import Icon from "@/components/icon";

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
  return (
    <Card
      sx={{
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.7)",
        flex: 1,
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
