import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  create(createBoardDto: CreateBoardDto) {
    this.test.push(4)
    return 'This action adds a new board';
  }

  findAll() {
    return [`This action returns all board`, this.test];
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
  test:number[] = [0,1,2,3]
}
