import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function UpdateGarageForm() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">
            Modifier les informations de votre garage
          </h1>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Nom du garage</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Nom du garage" />
              </form>
            </CardContent>
            <CardHeader>
              <CardTitle>Adresse</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Adresse" />
              </form>
            </CardContent>
            <CardHeader>
              <CardTitle>Ville</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Ville" />
              </form>
            </CardContent>
            <CardHeader>
              <CardTitle>Département</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Département" />
              </form>
            </CardContent>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Description" />
              </form>
            </CardContent>
            <CardHeader>
              <CardTitle>Sélectionnez les services que vous proposez</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div>
                  <Checkbox label="Service 1" />
                  <label> Contrôle technique</label>
                </div>
                <div>
                  <Checkbox label="Service 2" />
                  <label> Pare-brise</label>
                </div>
                <div>
                  <Checkbox label="Service 3" />
                  <label> Pneu</label>
                </div>
                <div>
                  <Checkbox label="Service 4" />
                  <label> Transmission</label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
