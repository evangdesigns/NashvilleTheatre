using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NashvilleTheatre.DataAccess;
using NashvilleTheatre.Models;

namespace NashvilleTheatre.Controllers
{
    [Route("api/lineitem")]
    public class LineItemController : ControllerBase
    {

        LineItemRepository _lineItemRepository;
        public LineItemController(LineItemRepository repository)
        {
            _lineItemRepository = repository;
        }

        // GET: api/lineitem/cart/{id}
        [HttpGet("cart/{id}")]
        public IActionResult GetLineItemsByCartId(int id)
        {
            var lineItems = _lineItemRepository.GetLineItemsByCartId(id);

            return Ok(lineItems);
            
        }

        // GET: api/lineitem/shows/cart/{id}
        [HttpGet("shows/cart/{id}")]
        public IActionResult GetShowLineItemsByCartId(int id)
        {
            var lineItems = _lineItemRepository.GetLineItemsByCartId(id);
            var shows = new List<ShowLineItem>();
            foreach (LineItem item in lineItems)
            {
                if (item.LineItemType == "Show")
                {
                    ShowLineItem show = _lineItemRepository.GetShowLineItem(item.ProductId);
                    shows.Add(show);
                }
            }
            return Ok(shows);

        }

        // GET: api/lineitem/subscriptions/cart/{id}
        [HttpGet("subscriptions/cart/{id}")]
        public IActionResult GetSubscriptionLineItem(int id)
        {
            var lineItems = _lineItemRepository.GetLineItemsByCartId(id);
            var subscriptions = new List<SubscriptionLineItem>();

            foreach (LineItem item in lineItems)
            {
                if (item.LineItemType == "Subscription")
                {
                    SubscriptionLineItem subscription = _lineItemRepository.GetSubscriptionLineItem(item.ProductId);
                    subscriptions.Add(subscription);
                }
            }

            return Ok(subscriptions);
        }
        //DELETE: api/lineitem/delete/{id}
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteLineItem(int id)
        {
             _lineItemRepository.DeleteLineItem(id);

            return Ok();
        }

        //POST: api/lineitem/{id}/quantity/{quantity}
        [HttpPost("{id}/quantity/{quantity}")]
        public IActionResult UpdateQuantity(int id, int quantity)
        {
            _lineItemRepository.UpdateQuantity(id, quantity);

            return Ok();
        }

        //POST: api/lineitem/add
        [HttpPost("add")]
        public IActionResult AddLineItem([FromBody]AddLineItem newLineItem)
        {
            var cart = _lineItemRepository.GetLineItemsByCartId(newLineItem.CartId);
            var itemTypeId = 2;
            foreach (LineItem item in cart) // Loop through Cart Item List
            {   //if LineItem Type and Product Id match to something already in the cart, add quantity to existing quantity.
                if (item.LineItemType == "Subscription")
                {
                    itemTypeId = 1;
                }
                if (itemTypeId == newLineItem.LineItemTypeId && item.ProductId == newLineItem.ProductId)
                {
                    //Update the quantity of the existing item
                    var newQuantity = item.Quantity + newLineItem.Quantity;
                    _lineItemRepository.UpdateQuantity(item.LineItemId, newQuantity);
                }
                else
                {
                    _lineItemRepository.AddALineItem(newLineItem);
                }
            }
            return Ok();
        }

    }
}
