import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, UserPlus } from "lucide-react";
import { z } from "zod";

const patientSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be 12 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  governmentScheme: z.enum(["none", "bpl", "ayushman_bharat", "yashasvini", "other"]),
  schemeBenefit: z.number().min(0).max(100),
});

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    aadhaarNumber: "",
    dateOfBirth: "",
    governmentScheme: "none",
    schemeBenefit: 0,
  });

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = patientSchema.parse({
        ...formData,
        schemeBenefit: Number(formData.schemeBenefit),
      });

      const age = calculateAge(validated.dateOfBirth);

      const { error } = await supabase.from("patients").insert({
        full_name: validated.fullName,
        phone: validated.phone,
        aadhaar_number: validated.aadhaarNumber,
        date_of_birth: validated.dateOfBirth,
        age: age,
        government_scheme: validated.governmentScheme,
        scheme_benefit_percentage: validated.schemeBenefit,
      });

      if (error) throw error;

      toast.success("Patient registered successfully!");
      navigate("/opd/dashboard");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="container mx-auto max-w-2xl space-y-6 py-8">
        <Button variant="ghost" onClick={() => navigate("/opd/dashboard")} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <Card className="border-2 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Patient Registration</CardTitle>
                <CardDescription>Register a new patient in the system</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (10 digits) *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Number (12 digits) *</Label>
                <Input
                  id="aadhaar"
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, "").slice(0, 12) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheme">Government Scheme</Label>
                <Select
                  value={formData.governmentScheme}
                  onValueChange={(value) => setFormData({ ...formData, governmentScheme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="bpl">BPL</SelectItem>
                    <SelectItem value="ayushman_bharat">Ayushman Bharat</SelectItem>
                    <SelectItem value="yashasvini">Yashasvini</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefit">Scheme Benefit Percentage (%)</Label>
                <Input
                  id="benefit"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.schemeBenefit}
                  onChange={(e) => setFormData({ ...formData, schemeBenefit: Number(e.target.value) })}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Patient"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientRegistration;
