package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"bestiesmile1845/finalProject.git/config"
	"bestiesmile1845/finalProject.git/controller"
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.POST("/login", controller.SignIn)
	router := r.Group("")
	{

		// User Routes
		router.GET("/members", controller.ListMembers)
		router.GET("/member/:id", controller.GetMember)
		router.POST("/members", controller.CreateMember)
		router.PATCH("/UpdateMember/:id", controller.UpdateMember)
		router.DELETE("/members/:id", controller.DeleteMember)
		router.GET("/members/count", controller.CountMembers)


		// Gender Routes
		router.GET("/genders", controller.ListGenders)

		// Admin Routers
		// router.GET("/admins", controller.ListAdmins)
		// router.GET("/admin/:id", controller.GetAdmin)
		// router.POST("/CreateAdmin", controller.CreateAdmin)
		// router.PATCH("/UpdateAdmin/:id", controller.UpdateAdmin)
		// router.DELETE("/admins/:id", controller.DeleteAdmin)


		
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	// Run the server

	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}