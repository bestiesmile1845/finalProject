package controller

import (
	"bestiesmile1845/finalProject.git/config"
	"bestiesmile1845/finalProject.git/entity"
	"github.com/gin-gonic/gin"
	"net/http"
)

// POST /users
func CreateMember(c *gin.Context) {
	var member entity.Users

	// bind เข้าตัวแปร member
	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ค้นหา gender ด้วย id
	var genders entity.Genders
	db.First(&genders, member.GenderID)
	if genders.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "gender not found"})
		return
	}

	// ตรวจสอบว่า username ซ้ำกันหรือไม่
	var existingMember entity.Users
	if err := db.Where("username = ?", member.Username).First(&existingMember).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "username already exists in member"})
		return
	}
	// ตรวจสอบว่า username ซ้ำกันหรือไม่ใน table Admin
	var existingAdmin entity.Admin
	if err := db.Where("username = ?", member.Username).First(&existingAdmin).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Username already exists in Admin"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashedPassword, _ := config.HashPassword(member.Password)

	// สร้าง.Users
	m := entity.Users{
		Firstname:   member.Firstname,
		Lastname:    member.Lastname,
		Email:       member.Email,
		Password:    hashedPassword,
		Username:    member.Username,
		GenderID:    member.GenderID,
		PhoneNumber: member.PhoneNumber,
		Gender:      genders,
		Age:         member.Age,
	}

	// บันทึก
	if err := db.Create(&m).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": m})
}

// GET /member/:id
func GetMember(c *gin.Context) {
	ID := c.Param("id")
	var member entity.Users

	db := config.DB()
	results := db.Preload("Gender").First(&member, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}
func GetUsername(c *gin.Context) {
	Username := c.Param("username")
	var member entity.Users

	db := config.DB()
	results := db.Preload("Gender").First(&member, Username)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}

func GetPassword(c *gin.Context) {
	Password := c.Param("password")
	var member entity.Users

	db := config.DB()
	results := db.Preload("Gender").First(&member, Password)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if member.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, member)
}

// GET /users
func ListMembers(c *gin.Context) {

	var users []entity.Users

	db := config.DB()
	results := db.Preload("Gender").Find(&users)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// DELETE /users/:id
func DeleteMember(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM members WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PATCH /users
func UpdateMember(c *gin.Context) {
	var member entity.Users

	MemberID := c.Param("Memberid")

	db := config.DB()
	result := db.First(&member, MemberID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&member); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&member)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	var existingMember entity.Users
	if err := db.Where("username = ?", member.Username).First(&existingMember).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "username already exists"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func CountMembers(c *gin.Context) {
	var count int64
	db := config.DB()
	if err := db.Model(&entity.Users{}).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"count": count})
}
