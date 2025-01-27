Private Sub SetDate(ByVal nmbrDays As Integer)
  Dim dDate As Date = Convert.ToDateTime(ViewState("currentDate"))
  If (sVisitDay = "") Then
    dDate = DateAdd("d", nmbrDays, dDate)
  End If

  dDate = DateAdd("d", -dDate.DayOfWeek + 1, dDate)

  ViewState("currentDate") = dDate
  If dDate < Date.Now Then
    btnPreviousWeek.Enabled = False
  Else
    btnPreviousWeek.Enabled = True
  End If
  lblWeekNumber.InnerText = "Vecka " & DatePart(DateInterval.WeekOfYear, Convert.ToDateTime(ViewState("currentDate")), Microsoft.VisualBasic.FirstDayOfWeek.Monday, FirstWeekOfYear.FirstFourDays) & " - " & Convert.ToDateTime(ViewState("currentDate")).Year
End Sub

public static DateTime DateAdd(string Interval, double Number, object DateValue)
{
    DateTime dateValue;
    try
    {
        dateValue = Conversions.ToDate(DateValue);
    }
    catch (StackOverflowException ex)
    {
        throw ex;
    }
    catch (OutOfMemoryException ex2)
    {
        throw ex2;
    }
    catch (ThreadAbortException ex3)
    {
        throw ex3;
    }
    catch (Exception)
    {
        throw new InvalidCastException(Utils.GetResourceString("Argument_InvalidDateValue1", "DateValue"));
    }

    return DateAdd(DateIntervalFromString(Interval), Number, dateValue);
}

private static DateInterval DateIntervalFromString(string Interval)
{
    if (Interval != null)
    {
        Interval = Interval.ToUpperInvariant();
    }

    return Interval switch
    {
        "YYYY" => DateInterval.Year,
        "Y" => DateInterval.DayOfYear,
        "M" => DateInterval.Month,
        "D" => DateInterval.Day,
        "H" => DateInterval.Hour,
        "N" => DateInterval.Minute,
        "S" => DateInterval.Second,
        "WW" => DateInterval.WeekOfYear,
        "W" => DateInterval.Weekday,
        "Q" => DateInterval.Quarter,
        _ => throw new ArgumentException(Utils.GetResourceString("Argument_InvalidValue1", "Interval")),
    };
}
