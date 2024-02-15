"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast";
export default function DashboardPage() {
  const {toast} = useToast()
  const [url, setUrl] = useState("https://github.com/aneeshseth/boilerplatevite.git")
  const [projectName, setProjectName] = useState("")
  async function deploy() {
    if (url == "" ||  projectName == "") return;
    await axios.post("https://percelapi.aneesh.pro/deploy", {
        gitURL: url,
        projectName: projectName
    })
    alert(`http://${projectName}.percel100x.aneesh.pro (takes between 120s and 200s to deploy.)`)
  }
  return (
    <div>
      <div className="flex-col md:flex justify-center w-screen">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex w-screen justify-center items-center h-screen -mt-24">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                      Github URL
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent className="items-center">
                    <Input className="bg-neutral-900 mt-2" value={url} onChange={(e) => setUrl(e.target.value)}/>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-md font-medium">
                        Project Name
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                 <CardContent className="items-center">
                    <Input className="bg-neutral-900 mt-2" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                  </CardContent>
                </Card>
               
                <Button className="mt-10" onClick={deploy}>Deploy app</Button>
              </div>
            </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
