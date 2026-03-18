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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PhotoUploadZone from "@/components/PhotoUploadZone";
import ReportPreview, { type ServiceReportData } from "@/components/ReportPreview";

const Index = () => {
  const { toast } = useToast();

  // Customer Information
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Robot Information
  const [robotType, setRobotType] = useState("");
  const [robotSerialNumber, setRobotSerialNumber] = useState("");

  // Case Information
  const [robotIssue, setRobotIssue] = useState("");
  const [serviceTimeStart, setServiceTimeStart] = useState("");
  const [serviceTimeEnd, setServiceTimeEnd] = useState("");
  const [engineerReport, setEngineerReport] = useState("");
  const [beforePhotos, setBeforePhotos] = useState<File[]>([]);
  const [afterPhotos, setAfterPhotos] = useState<File[]>([]);
  const [serviceStatus, setServiceStatus] = useState("");
  const [serviceCompletedBy, setServiceCompletedBy] = useState("");
  const [serviceDate, setServiceDate] = useState<Date>();

  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reportData: ServiceReportData = {
    companyName,
    companyAddress,
    contactName,
    contactNumber,
    robotType,
    robotSerialNumber,
    robotIssue,
    serviceTimeStart,
    serviceTimeEnd,
    engineerReport,
    beforePhotos,
    afterPhotos,
    serviceStatus,
    serviceCompletedBy,
    serviceDate,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactName.trim() || !robotSerialNumber.trim() || !engineerReport.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setShowPreview(true);
      setSubmitting(false);
      toast({
        title: "Report generated",
        description: "Your service report has been generated below.",
      });
    }, 400);
  };

  const resetForm = () => {
    setCompanyName("");
    setCompanyAddress("");
    setContactName("");
    setContactNumber("");
    setRobotType("");
    setRobotSerialNumber("");
    setRobotIssue("");
    setServiceTimeStart("");
    setServiceTimeEnd("");
    setEngineerReport("");
    setBeforePhotos([]);
    setAfterPhotos([]);
    setServiceStatus("");
    setServiceCompletedBy("");
    setServiceDate(undefined);
    setShowPreview(false);
  };

  return (
    <div className="flex min-h-screen items-start justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-[640px] space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <ClipboardList className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Service Report</h1>
            <p className="text-sm text-muted-foreground">Document and submit robot service details</p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          {/* Customer Information */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-foreground">Customer Information</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} maxLength={100} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input id="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} maxLength={200} />
            </div>
            <div className="max-w-[240px] space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} maxLength={20} />
            </div>
          </fieldset>

          <hr className="border-border" />

          {/* Robot Information */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-foreground">Robot Information</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="robotType">Robot Type</Label>
                <Input id="robotType" value={robotType} onChange={(e) => setRobotType(e.target.value)} maxLength={50} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="robotSerial">Robot Serial Number</Label>
                <Input id="robotSerial" value={robotSerialNumber} onChange={(e) => setRobotSerialNumber(e.target.value)} className="font-mono" maxLength={50} />
              </div>
            </div>
          </fieldset>

          <hr className="border-border" />

          {/* Case Information */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-foreground">Case Information</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="robotIssue">Robot Issue</Label>
                <Input id="robotIssue" value={robotIssue} onChange={(e) => setRobotIssue(e.target.value)} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label>Service Time</Label>
                <div className="flex items-center gap-2">
                  <Input type="time" value={serviceTimeStart} onChange={(e) => setServiceTimeStart(e.target.value)} className="flex-1" />
                  <span className="text-sm text-muted-foreground">to</span>
                  <Input type="time" value={serviceTimeEnd} onChange={(e) => setServiceTimeEnd(e.target.value)} className="flex-1" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="engineerReport">Engineer Report</Label>
              <Textarea
                id="engineerReport"
                value={engineerReport}
                onChange={(e) => setEngineerReport(e.target.value)}
                rows={6}
                className="resize-y"
                maxLength={3000}
              />
            </div>

            <div className="space-y-2">
              <Label>Before Service Images</Label>
              <PhotoUploadZone files={beforePhotos} onFilesChange={setBeforePhotos} label="Drop before-service photos here" />
            </div>

            <div className="space-y-2">
              <Label>After Service Images</Label>
              <PhotoUploadZone files={afterPhotos} onFilesChange={setAfterPhotos} label="Drop after-service photos here" />
            </div>
          </fieldset>

          <hr className="border-border" />

          {/* Service Status & Completion */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-foreground">Service Status</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={serviceStatus} onValueChange={setServiceStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                    <SelectItem value="Pending Parts">Pending Parts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="completedBy">Completed By</Label>
                <Input id="completedBy" value={serviceCompletedBy} onChange={(e) => setServiceCompletedBy(e.target.value)} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label>Service Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !serviceDate && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {serviceDate ? format(serviceDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={serviceDate} onSelect={setServiceDate} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </fieldset>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="submit" disabled={submitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {submitting ? "Generating…" : "Generate Report"}
            </Button>
            {showPreview && (
              <Button type="button" variant="outline" onClick={resetForm}>
                New Report
              </Button>
            )}
          </div>
        </form>

        {/* Report Preview */}
        {showPreview && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Generated Report</h2>
            <ReportPreview data={reportData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
