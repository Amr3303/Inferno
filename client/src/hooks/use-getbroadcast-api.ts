interface Broadcast {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface BroadcastResponse {
  success: boolean;
  message: string;
  data: Broadcast[];
}

export const getMyBroadcasts = async (): Promise<Broadcast[] | null> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await fetch(
      "https://inferno-neon.vercel.app/api/v1/broadcasts/my",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data: BroadcastResponse = await response.json();
    if (data.success) {
      localStorage.setItem("selectedBroadcastId", data.data[0]._id);
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching broadcasts:", error);
    return null;
  }
};
