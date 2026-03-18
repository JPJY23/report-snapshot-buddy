import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import PhotoUploadZone from "@/components/PhotoUploadZone";

const Index = () => {
  const { toast } = useToast();
  const [reporter, setReporter] = useState("");
  const [operator, setOperator] = useState("");
  const [reportNumber, setReportNumber] = useState("");
  const [issue, setIssue] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [reportDate, setReportDate] = useState<Date>();
  const [incidentTime, setIncidentTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reporter.trim() || !operator.trim() || !reportNumber.trim() || !issue.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Report submitted",
        description: `Report #${reportNumber} has been filed successfully.`,
      });
      setReporter("");
      setOperator("");
      setReportNumber("");
      setIssue("");
      setPhotos([]);
      setReportDate(undefined);
      setIncidentTime("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-[640px]">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ClipboardList className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Robot Issue Report</h1>
            <p className="text-sm text-muted-foreground">Document and submit robot malfunction details</p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {/* Reporter & Operator row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reporter">Reporter Name</Label>
              <Input
                id="reporter"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                placeholder=""
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operator">Robot Operator</Label>
              <Input
                id="operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                placeholder=""
                maxLength={100}
              />
            </div>
          </div>

          {/* Report Number */}
          <div className="max-w-[200px] space-y-2">
            <Label htmlFor="reportNumber">Report Number</Label>
            <Input
              id="reportNumber"
              value={reportNumber}
              onChange={(e) => setReportNumber(e.target.value)}
              className="font-mono"
              placeholder=""
              maxLength={50}
            />
          </div>

          {/* Issue Description */}
          <div className="space-y-2">
            <Label htmlFor="issue">Issue Description</Label>
            <Textarea
              id="issue"
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              rows={5}
              className="resize-y"
              placeholder=""
              maxLength={2000}
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photos</Label>
            <PhotoUploadZone files={photos} onFilesChange={setPhotos} />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
          >
            {submitting ? "Submitting…" : "Submit Report"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;
