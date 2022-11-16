import { Contract } from 'ethers';
import { LiquidityResult } from './models/LiquidityResult.js';

export class Dex {
  constructor(private uniswapFactory: Contract, private uniswapRouter: Contract) {}

  async addLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: number,
    amountBDesired: number,
    amountAMin: number,
    amountBMin: number,
    to: string,
    deadline: number
  ): Promise<LiquidityResult> {
    const result = await this.uniswapRouter.addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      to,
      deadline
    );

    return result;
  }

  async getAllPairs(pairId: number): Promise<string> {
    const pairAddress = await this.uniswapFactory.allPairs(pairId);

    return pairAddress;
  }

  async getAmountIn(amountOut: number, reserveIn: number, reserveOut: number) {
    const amountIn = await this.uniswapRouter.getAmountIn(amountOut, reserveIn, reserveOut);

    return amountIn;
  }

  async getPair(token1Address: string, token2Address: string): Promise<string> {
    const pairAddress = await this.uniswapFactory.getPair(token1Address, token2Address);

    return pairAddress;
  }

  async removeLiquidity(
    tokenA: string,
    tokenB: string,
    amountADesired: number,
    amountBDesired: number,
    liquidity: number,
    amountAMin: number,
    amountBMin: number,
    to: string,
    deadline: number
  ): Promise<{ amountA: number; amountB: number }> {
    const result = await this.uniswapRouter.removeLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      liquidity,
      amountAMin,
      amountBMin,
      to,
      deadline
    );

    return result;
  }

  async swapExactTokensForTokens(
    amountIn: number,
    amountOutMin: number,
    path: string[],
    to: string,
    deadline: number
  ): Promise<number> {
    const result = await this.uniswapRouter.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);

    return result;
  }

  async swapTokensForExactTokens(
    amountOut: number,
    amountInMax: number,
    path: string[],
    to: string,
    deadline: number
  ): Promise<number> {
    const result = await this.uniswapRouter.swapExactTokensForTokens(amountOut, amountInMax, path, to, deadline);

    return result;
  }
}
