import { NextResponse } from "next/server";
import { calculateJobMatch } from "@/lib/jobs/matchJob";

export async function GET() {

  const result = calculateJobMatch(
    [
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript"
    ],
    "C++, JavaScript, React, Node.js"
  );


  return NextResponse.json(result);

}