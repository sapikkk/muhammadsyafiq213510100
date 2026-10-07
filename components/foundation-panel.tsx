"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roleLabel, roles, type Role } from "@/types/role";

const people: { role: Role; name: string }[] = [
  { role: "OWNER", name: "Koko Nuswantoro" },
  { role: "ADMIN", name: "Admin pembukuan" },
  {
    role: "PEKERJA",
    name: "Marzuki, Darusman, Widi Antoni, Hudzaifah Mutahajjid",
  },
];

export function FoundationPanel() {
  const [role, setRole] = useState<Role>("OWNER");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fondasi terpasang</CardTitle>
          <CardDescription>
            Next.js 14, TypeScript ketat, Tailwind, dan komponen dasar. Skema 16
            tabel ada di PostgreSQL. Login tiga peran ada di halaman Masuk.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge>App Router</Badge>
          <Badge variant="secondary">Tailwind</Badge>
          <Badge variant="outline">shadcn/ui</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peran</CardTitle>
          <CardDescription>
            Tiga peran di sistem. Akun demo masuk lewat halaman Masuk.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1.5 text-sm">
              <span className="font-medium">Coba pilih peran</span>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as Role)}
              >
                <SelectTrigger aria-label="Peran">
                  <SelectValue placeholder="Pilih peran" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((item) => (
                    <SelectItem key={item} value={item}>
                      {roleLabel[item]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="space-y-1.5 text-sm">
              <span className="font-medium">Catatan</span>
              <Input
                readOnly
                value={`${roleLabel[role]} · rakit apung, 1.920 lubang`}
              />
            </label>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Peran</TableHead>
                <TableHead>Orang</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person.role}>
                  <TableCell>{roleLabel[person.role]}</TableCell>
                  <TableCell>{person.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">Langkah berikutnya</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>US1.6: daftar petani</DialogTitle>
                <DialogDescription>
                  Admin mendaftarkan akun petani di halaman Admin. Owner melihat
                  daftarnya. Tidak ada pendaftaran publik.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
