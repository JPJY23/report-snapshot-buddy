import { format } from "date-fns";
import { useRef } from "react";

export interface ServiceReportData {
  companyName: string;
  companyAddress: string;
  contactName: string;
  contactNumber: string;
  robotType: string;
  robotSerialNumber: string;
  robotIssue: string;
  serviceTimeStart: string;
  serviceTimeEnd: string;
  engineerReport: string;
  beforePhotos: File[];
  afterPhotos: File[];
  serviceStatus: string;
  serviceCompletedBy: string;
  serviceDate: Date | undefined;
}

interface ReportPreviewProps {
  data: ServiceReportData;
}

const ReportRow = ({ label, value }: { label: string; value: string }) => (
  <tr className="border-b border-border">
    <td className="w-[200px] px-4 py-3 text-sm text-foreground">{label}</td>
    <td className="px-4 py-3 text-sm text-foreground">{value}</td>
  </tr>
);

const SectionHeader = ({ title }: { title: string }) => (
  <tr className="border-b border-border bg-secondary/50">
    <td colSpan={2} className="px-4 py-2.5 text-sm font-semibold text-foreground">
      {title}
    </td>
  </tr>
);

const ImageRow = ({ label, files }: { label: string; files: File[] }) => (
  <tr className="border-b border-border">
    <td className="w-[200px] px-4 py-4 align-top text-sm text-foreground">{label}</td>
    <td className="px-4 py-4">
      {files.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <img
              key={i}
              src={URL.createObjectURL(file)}
              alt={`${label} ${i + 1}`}
              className="h-24 w-24 rounded-md border border-border object-cover"
            />
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">No images</span>
      )}
    </td>
  </tr>
);

const ReportPreview = ({ data }: ReportPreviewProps) => {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={reportRef} className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Service Report</h2>
        <span className="text-lg font-bold tracking-wide text-accent">AUTOVEX</span>
      </div>

      {/* Customer Information */}
      <table className="mb-6 w-full border-collapse overflow-hidden rounded-lg border border-border">
        <tbody>
          <SectionHeader title="Customer Information" />
          <ReportRow label="Company Name" value={data.companyName} />
          <ReportRow label="Company Address" value={data.companyAddress} />
          <ReportRow label="Contact Name" value={data.contactName} />
          <ReportRow label="Contact Number" value={data.contactNumber} />
          <SectionHeader title="Robot Information" />
          <ReportRow label="Robot Type" value={data.robotType} />
          <ReportRow label="Robot Serial Number" value={data.robotSerialNumber} />
        </tbody>
      </table>

      {/* Case Information */}
      <table className="mb-6 w-full border-collapse overflow-hidden rounded-lg border border-border">
        <tbody>
          <SectionHeader title="Case Information" />
          <ReportRow label="Robot Issue" value={data.robotIssue} />
          <ReportRow
            label="Service Time"
            value={
              data.serviceTimeStart && data.serviceTimeEnd
                ? `${data.serviceTimeStart} - ${data.serviceTimeEnd}`
                : data.serviceTimeStart || "—"
            }
          />
          <tr className="border-b border-border">
            <td className="w-[200px] px-4 py-3 align-top text-sm text-foreground">Engineer Report</td>
            <td className="px-4 py-3 text-sm leading-relaxed text-foreground">
              {data.engineerReport || "—"}
            </td>
          </tr>
          <ImageRow label="Before Service Images" files={data.beforePhotos} />
          <ImageRow label="After Service Images" files={data.afterPhotos} />
          <ReportRow label="Service Status" value={data.serviceStatus || "—"} />
          <ReportRow label="Service Completed By" value={data.serviceCompletedBy} />
          <ReportRow
            label="Service Date"
            value={data.serviceDate ? format(data.serviceDate, "yyyy-MM-dd") : "—"}
          />
        </tbody>
      </table>

      <p className="text-xs text-muted-foreground">
        This is a computer generated maintenance report, no signature is required.
      </p>
    </div>
  );
};

export default ReportPreview;
