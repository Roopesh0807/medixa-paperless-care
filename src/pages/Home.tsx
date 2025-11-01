import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Stethoscope, Microscope } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "OPD",
      description: "Outpatient Department Management",
      icon: Activity,
      path: "/opd",
      gradient: "from-primary to-accent",
    },
    {
      title: "Doctors",
      description: "Medical Professional Portal",
      icon: Stethoscope,
      path: "/doctors",
      gradient: "from-secondary to-emerald-500",
    },
    {
      title: "Patients",
      description: "Patient Information System",
      icon: Users,
      path: "/patients",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Others",
      description: "Labs & Nursing Department",
      icon: Microscope,
      path: "/others",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg">
              <Activity className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                MediXa
              </h1>
              <p className="text-sm text-muted-foreground">Paperless Hospital Management</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">MediXa</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your complete digital healthcare ecosystem for secure, efficient, and paperless hospital operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.title}
                className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-hover)] cursor-pointer"
                onClick={() => navigate(module.path)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <CardContent className="p-8 space-y-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${module.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground">{module.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Access Portal →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 MediXa. All rights reserved. | Secure • Confidential • Paperless</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
