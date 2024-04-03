import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LastReservations = () => {
  return (
    <div>
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Réservations</CardTitle>
            <CardDescription>
              Les dernières réservations effectuées par vos clients
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1 bg-[#34469C]">
            <Link href="#">
              Voir tout
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead className="">Type</TableHead>
                <TableHead className="">Status</TableHead>
                <TableHead className="">Date</TableHead>
                <TableHead className="">Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                </TableCell>
                <TableCell className="">Réparation</TableCell>
                <TableCell className="">
                  <Badge
                    className="text-xs text-green-600 border-green-600"
                    variant="outline"
                  >
                    Passée
                  </Badge>
                </TableCell>
                <TableCell className="">2023-06-23</TableCell>
                <TableCell className="">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Olivia Smith</div>
                </TableCell>
                <TableCell className="">Contrôle Technique</TableCell>
                <TableCell className="">
                  <Badge
                    className="text-xs text-red-800 border-red-800"
                    variant="outline"
                  >
                    Annulée
                  </Badge>
                </TableCell>
                <TableCell className="">2023-06-24</TableCell>
                <TableCell className="">$150.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Noah Williams</div>
                </TableCell>
                <TableCell className="">Entretien</TableCell>
                <TableCell className="">
                  <Badge
                    className="text-xs text-green-600 border-green-600"
                    variant="outline"
                  >
                    Passée
                  </Badge>
                </TableCell>
                <TableCell className="">2023-06-25</TableCell>
                <TableCell className="">$350.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Emma Brown</div>
                </TableCell>
                <TableCell className="">Réparation</TableCell>
                <TableCell className="">
                  <Badge
                    className="text-xs text-orange-500 border-orange-500"
                    variant="outline"
                  >
                    En attente
                  </Badge>
                </TableCell>
                <TableCell className="">2023-06-26</TableCell>
                <TableCell className="">$450.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="font-medium">Liam Johnson</div>
                </TableCell>
                <TableCell className="">Entretien</TableCell>
                <TableCell className="">
                  <Badge
                    className="text-xs text-orange-500 border-orange-500"
                    variant="outline"
                  >
                    En attente
                  </Badge>
                </TableCell>
                <TableCell className="">2023-06-27</TableCell>
                <TableCell className="">$550.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LastReservations;
