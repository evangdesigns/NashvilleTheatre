﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NashvilleTheatre.DataAccess;

namespace NashvilleTheatre.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        CategoryRepository _categoryRepository;

        public CategoryController(CategoryRepository repository)
        {
            _categoryRepository = repository;
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var categories = _categoryRepository.GetAllCategories();
            return Ok(categories);
        }


        [HttpGet("shows/{categoryId}")]
        public IActionResult GetShowsByCategory(int categoryId)
        {
            var showsByCategory = _categoryRepository.GetAllShowsByCategoryId(categoryId);

            if (showsByCategory == null)
            {
                return NotFound("No shows in that category.");
            }
            else
            {
                return Ok(showsByCategory);
            }
        }


        [HttpGet("top/categories")]
        public IActionResult GetTopCategories()
        {
            var categories = _categoryRepository.GetTopCategories();
            return Ok(categories);
        }

        [HttpGet("top/categories/{categoryId}")]
        public IActionResult GetTopCategoriesWithShows(int categoryId)
        {
            var categories = _categoryRepository.GetTopCategoriesWithShows(categoryId);
            return Ok(categories);
        }

        //Need Top categories that only shows exist
    }
}