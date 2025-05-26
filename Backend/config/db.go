package config

import (
	"fmt"

	"bestiesmile1845/finalProject.git/entity"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func ConnectionDB() {

	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	fmt.Println("connected database")

	db = database

}

func SetupDatabase() {

	db.AutoMigrate(

		&entity.Users{},
		&entity.Admin{},
		&entity.Genders{},
	)

	GenderMale := entity.Genders{Gender: "Male"}

	GenderFemale := entity.Genders{Gender: "Female"}

	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Male"})

	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Female"})

	hashedPassword, _ := HashPassword("123456")

	User := &entity.Users{
		Username:    "smile",
		Password:    hashedPassword,
		Email:       "smile@gmail.com",
		Firstname:   "Thawamhathai",
		Lastname:    "Bandasak",
		PhoneNumber: "0655765586",
		Age:         15,
		GenderID:    2,
	}
	hashedPasswordAd, _ := HashPassword("admin")
	Admin := entity.Admin{
		Username:  "Admin",
		Password:  hashedPasswordAd,
		Email:     "Admin@gmail.com",
		Firstname: "Thawan",
		Lastname:  "Banda",
		GenderID:  2,
	}

	db.FirstOrCreate(User, &entity.Users{

		Email: "sa@gmail.com",
	})
	db.FirstOrCreate(&Admin, entity.Admin{Email: "PsAdmin@gmail.com"})

}
