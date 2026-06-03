import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Spaces for Humans";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1C1C18",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "2px",
              backgroundColor: "#B8892A",
            }}
          />
          <div
            style={{
              fontSize: "64px",
              fontStyle: "italic",
              color: "#FAFAF8",
              textAlign: "center",
              maxWidth: "900px",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#B8892A",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Phoenix Custom Millwork
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
