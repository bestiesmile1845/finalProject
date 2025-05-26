package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"bestiesmile1845/finalProject.git/entity"
	"bestiesmile1845/finalProject.git/config"

)
func ListGenders(c *gin.Context) {
	var genders []entity.Genders

	db := config.DB()

	db.Find(&genders)

	c.JSON(http.StatusOK, &genders)
}