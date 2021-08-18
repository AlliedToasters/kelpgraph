import { BigInt } from "@graphprotocol/graph-ts"
import {
  kelptoken,
  Approval,
  OwnershipTransferred,
  Transfer
} from "../generated/kelptoken/kelptoken"
import { KelpHolder, Trans } from "../generated/schema"

export function handleTransfer(event: Transfer): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let fromAccount = KelpHolder.load(event.transaction.from.toHex())
  if (fromAccount == null) {
    fromAccount = new KelpHolder(event.transaction.from.toHex())
  }

  let toAccount = KelpHolder.load(event.transaction.to.toHex())
  if (toAccount == null) {
    toAccount = new KelpHolder(event.transaction.to.toHex())
  }

  let transfer = new Trans(
    event.transaction.hash.toHex(),
    fromAccount,
    toAccount,
    event.transaction.value
    )
  

  // Entities can be written to the store with `.save()`
  fromAccount.save()
  toAccount.save()
  transfer.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.allowance(...)
  // - contract.appreciationParameter(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.computeAmountToMint(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.increaseAllowance(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.totalGramsBiomassSequestered(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}