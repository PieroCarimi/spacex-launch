export default function Iframe({ webcast_code }: { webcast_code: string }) {
    return (
        <div style={{
            position: "relative",
            width: "98%",
            maxWidth: "800px",
            margin: "0 auto",
            overflow: "hidden",
            marginBottom: 200
        }}>
            <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", 
                overflow: "hidden"
            }}>
                <iframe
                    src={`https://www.youtube.com/embed/${webcast_code}`}
                    allowFullScreen
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0
                    }}
                ></iframe>
            </div>
        </div>
    )
}
