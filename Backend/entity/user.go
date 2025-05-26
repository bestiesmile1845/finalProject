package entity

import (
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model

	Firstname   string
	Lastname    string
	Email       string
	Password    string
	Username    string
	GenderID    uint
	Age         int
	PhoneNumber string
	Gender      Genders `gorm:"foreignKey:GenderID"`
}
