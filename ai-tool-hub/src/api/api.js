export const generateBusinessNames = async (industry, keywords) => {
    try {
      const response = await fetch("http://localhost:5000/generate-business-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industry, keywords }),
      });
  
      if (!response.ok) throw new Error("Failed to generate names");
  
      const data = await response.json();
      return data.names;
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  };
  